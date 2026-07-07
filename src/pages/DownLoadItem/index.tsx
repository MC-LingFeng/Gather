import {
  CloudDownloadOutlined,
  CodeOutlined,
  EditOutlined,
  FileZipOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Modal, Spin, message } from 'antd';
import JSZip from 'jszip';
import { useMemo, useState } from 'react';
import itemNames from '../../../config/download-items.json';
import styles from './index.module.css';

export const ItemToName = itemNames as Record<string, string>;

interface EnvEntry {
  key: string;
  value: string;
}

const parseEnv = (content: string): EnvEntry[] =>
  content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => {
      const separator = line.indexOf('=');
      return { key: line.slice(0, separator).trim(), value: line.slice(separator + 1) };
    });

const updateEnv = (content: string, values: Record<string, string>) =>
  content
    .split(/\r?\n/)
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !line.includes('=')) return line;
      const separator = line.indexOf('=');
      const key = line.slice(0, separator).trim();
      return Object.prototype.hasOwnProperty.call(values, key)
        ? `${key}=${values[key] ?? ''}`
        : line;
    })
    .join('\n');

const assetUrl = (folder: string, assetName: string) =>
  new URL(`download-assets/${folder}/${assetName}`, document.baseURI).toString();

const assertAssetResponse = async (response: Response, fileName: string) => {
  if (!response.ok) throw new Error(`${fileName}: HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    throw new Error(`${fileName}: 静态资源不存在，服务器返回了 HTML`);
  }
  return response;
};

const triggerDownload = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

const DownLoadItem = () => {
  const [form] = Form.useForm<Record<string, string>>();
  const [selected, setSelected] = useState<string>();
  const [envSource, setEnvSource] = useState('');
  const [envEntries, setEnvEntries] = useState<EnvEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const items = useMemo(() => Object.entries(ItemToName), []);

  const openEditor = async (folder: string) => {
    const devFile = DOWNLOAD_MANIFEST[folder]?.find((file) => file.name === '.dev');
    
    if (!devFile) {
      message.error(`${folder} 中未找到 .dev 文件`);
      return;
    }
    setSelected(folder);
    setLoading(true);
    form.resetFields();
    try {
      const response = await assertAssetResponse(
        await fetch(assetUrl(folder, devFile.assetName)),
        '.dev',
      );
      const source = await response.text();
      if (/^\s*<!doctype html/i.test(source) || /^\s*<html/i.test(source)) {
        throw new Error('.dev: 静态资源不存在，服务器返回了 HTML');
      }
      const entries = parseEnv(source);
      setEnvSource(source);
      setEnvEntries(entries);
      form.setFieldsValue(
        Object.fromEntries(entries.map(({ key, value }) => [key, value])),
      );
    } catch (error) {
      setSelected(undefined);
      message.error('配置文件加载失败，请确认静态资源已正确发布');
    } finally {
      setLoading(false);
    }
  };

  const downloadZip = async () => {
    if (!selected) return;
    const files = DOWNLOAD_MANIFEST[selected] || [];
    setDownloading(true);
    try {
      const values = form.getFieldsValue();
      const zip = new JSZip();
      const folder = zip.folder(selected);
      if (!folder) throw new Error('无法创建压缩目录');

      await Promise.all(
        files.map(async (file) => {
          if (file.name === '.dev') {
            folder.file(file.name, updateEnv(envSource, values));
            return;
          }
          const response = await assertAssetResponse(
            await fetch(assetUrl(selected, file.assetName)),
            file.name,
          );
          folder.file(file.name, await response.blob());
        }),
      );

      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      triggerDownload(blob, `${selected}.zip`);
      message.success('脚本压缩包已生成');
      setSelected(undefined);
    } catch (error) {
      message.error('下载失败，请检查静态资源是否完整');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}><CodeOutlined /> SCRIPT CENTER</span>
        <h1>脚本下载中心</h1>
        <p>选择需要的脚本，检查并编辑运行配置，然后生成可直接使用的 ZIP 压缩包。</p>
        <div className={styles.summary}>
          <span><strong>{items.length}</strong> 个脚本</span>
          <span><strong>{Object.values(DOWNLOAD_MANIFEST).reduce((total, files) => total + files.length, 0)}</strong> 个文件</span>
        </div>
      </header>

      <section className={styles.grid} aria-label="可下载脚本">
        {items.map(([folder, name], index) => (
          <article className={styles.card} key={folder}>
            <div className={styles.cardTop}>
              <span className={styles.icon}><FileZipOutlined /></span>
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.folder}>{folder}</span>
              <h2>{name}</h2>
              <p>包含 {DOWNLOAD_MANIFEST[folder]?.length || 0} 个文件，可在下载前调整环境配置。</p>
            </div>
            <Button type="primary" block icon={<EditOutlined />} onClick={() => openEditor(folder)}>
              配置并下载
            </Button>
          </article>
        ))}
      </section>

      <Modal
        title={selected ? `编辑配置 · ${ItemToName[selected]}` : '编辑配置'}
        open={Boolean(selected)}
        width={720}
        onCancel={() => !downloading && setSelected(undefined)}
        footer={[
          <Button key="cancel" disabled={downloading} onClick={() => setSelected(undefined)}>取消</Button>,
          <Button key="download" type="primary" loading={downloading} icon={<CloudDownloadOutlined />} onClick={downloadZip}>生成 ZIP 并下载</Button>,
        ]}
        destroyOnClose
      >
        <Spin spinning={loading}>
          <div className={styles.modalHint}>配置项来自脚本目录内的 <code>.dev</code> 文件，空值也会原样写入压缩包。</div>
          <Form form={form} layout="vertical" className={styles.form}>
            {envEntries.map(({ key }) => (
              <Form.Item key={key} name={key} label={key}>
                <Input.TextArea autoSize={{ minRows: 1, maxRows: 4 }} spellCheck={false} />
              </Form.Item>
            ))}
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default DownLoadItem;
