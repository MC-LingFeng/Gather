import ReactMarkdown from 'react-markdown';

import mark from './performance.md'
import { useMarkdown } from '@/hooks';

const Help = () => {
  const markdownProps = useMarkdown(mark)

  return (
    <div>
      <div className="article-container">
        <ReactMarkdown {...markdownProps} />
      </div>
    </div>
  );
};
export default Help;
