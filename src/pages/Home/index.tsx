import { ArrowRightOutlined, AppstoreOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { toolItems, type ToolItem } from '@/constants/tools';
import { history, useModel } from '@umijs/max';
import { Button } from 'antd';
import dayjs from 'dayjs';
import styles from './index.less';

const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

const ToolCard = ({ tool }: { tool: ToolItem }) => (
  <button type="button" className={styles.toolCard} onClick={() => history.push(tool.path)}>
    <span className={styles.toolIcon}>{tool.icon}</span>
    <span className={styles.toolContent}>
      <span className={styles.toolMeta}>{tool.category}</span>
      <strong>{tool.name}</strong>
      <span className={styles.toolDescription}>{tool.description}</span>
    </span>
    <ArrowRightOutlined className={styles.cardArrow} />
  </button>
);

const HomePage = () => {
  const { initialState } = useModel('@@initialState');
  const now = dayjs();
  const featuredTools = toolItems.filter((tool) => tool.featured);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}><ThunderboltOutlined /> Gather workspace</span>
          <h1>把常用工具，<br /><em>收进一个工作台。</em></h1>
          <p>简单、快速地访问你的创作、效率与生活工具，让每次打开都有明确的下一步。</p>
          <div className={styles.heroActions}>
            <Button type="primary" size="large" icon={<AppstoreOutlined />} onClick={() => document.getElementById('all-tools')?.scrollIntoView({ behavior: 'smooth' })}>浏览全部工具</Button>
            <Button size="large" onClick={() => history.push(featuredTools[0].path)}>打开常用工具</Button>
          </div>
        </div>
        <div className={styles.dateCard} aria-label="当前日期">
          <span>{now.format('YYYY')}</span>
          <strong>{now.format('MM.DD')}</strong>
          <small>{weekdays[now.day()]}</small>
          <div className={styles.dateDecoration}><i /><i /><i /></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div><span className={styles.sectionLabel}>QUICK ACCESS</span><h2>常用工具</h2></div>
          <span className={styles.count}>{featuredTools.length} 个快捷入口</span>
        </div>
        <div className={`${styles.toolGrid} ${styles.featuredGrid}`}>
          {featuredTools.map((tool) => <ToolCard key={tool.path} tool={tool} />)}
        </div>
      </section>

      <section className={styles.section} id="all-tools">
        <div className={styles.sectionHeader}>
          <div><span className={styles.sectionLabel}>ALL APPLICATIONS</span><h2>全部应用</h2></div>
          <span className={styles.count}>{toolItems.length} 个可用工具</span>
        </div>
        <div className={styles.toolGrid}>
          {toolItems.map((tool) => <ToolCard key={tool.path} tool={tool} />)}
        </div>
      </section>

      <div className={styles.statusBar}>
        <span><i /> 工作台运行正常</span>
        <span>{initialState?.name || 'Gather'} · Focus on what matters</span>
      </div>
    </div>
  );
};

export default HomePage;
