import React from 'react';
import ReactMarkdown from 'react-markdown';

interface PureMarkdownProps {
  children: string;
}

export default function PureMarkdown({ children }: PureMarkdownProps) {
  return <ReactMarkdown>{children}</ReactMarkdown>;
}
