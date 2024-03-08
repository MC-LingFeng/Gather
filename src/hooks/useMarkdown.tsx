import { useSafeState, useUpper } from '@/hooks';
import { useModel } from '@umijs/max';
import 'markdown-navbar/dist/navbar.css';
import { useEffect, useMemo } from 'react';
import { Options } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  solarizedlight as blue,
  coy,
  okaidia as dark,
  coldarkCold as white,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';

const styleObj: Record<string, any> = {
  white: white,
  black: dark,
  blue: blue,
};
const useMarkdown: (file: string, style?: any) => Options = (file, style) => {
  const [md, handleMD] = useSafeState<string>('loading...');
  // const theme = window.localStorage.getItem('theme') || 'white'
  const { themeName: theme } = useModel('theme');
  const upper = useUpper();

  useEffect(() => {
    fetch(file)
      .then((resp) => resp.text())
      .then((txt) => handleMD(txt));
  }, [md]);

  const getStyle = useMemo(() => {
    upper();
    if (style !== undefined) {
      return style;
    } else {
      return styleObj?.[theme] ?? coy;
    }
  }, [theme, style]);

  return {
    remarkPlugins: [[gfm, { singleTilde: false }]],
    children: md,
    components: {
      code(props) {
        const { children, className, ...rest } = props;
        const match = /language-(\w+)/.exec(className || '');

        return match ? (
          <SyntaxHighlighter
            {...rest}
            style={getStyle}
            language={match[1]}
            PreTag="div"
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code {...rest} className={className}>
            {children}
          </code>
        );
      },
    },
  };
};

export default useMarkdown;
