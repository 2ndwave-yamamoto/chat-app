import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize'
import rehypeKatex from 'rehype-katex';


interface PureMarkdownProps {
  children: string;
}

export default function PureMarkdown({ children }: PureMarkdownProps) {
  return <ReactMarkdown remarkPlugins={[remarkMath ,remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex]} components={{}}>{children}</ReactMarkdown>;
}
