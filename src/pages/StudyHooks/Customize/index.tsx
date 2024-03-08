import ReactMarkdown from 'react-markdown';

import { useMarkdown } from '@/hooks';
import mark from './performance.md';

const Help = () => {
  const markdownProps = useMarkdown(mark);

  return (
    <div>
      <div className="article-container">
        <ReactMarkdown {...markdownProps} />
      </div>
    </div>
  );
};
export default Help;
