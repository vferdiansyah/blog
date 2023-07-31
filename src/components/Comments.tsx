'use client';

import {
  Comments as CommentsComponent,
  CommentsConfig,
} from '@/components/Giscus';
import metadata from '@/data/metadata';
import { useState } from 'react';

const Comments = () => {
  const [loadComments, setLoadComments] = useState(false);

  return (
    <>
      {!loadComments && (
        <button onClick={() => setLoadComments(true)}>Load Comments</button>
      )}
      {metadata.comments && loadComments && (
        <CommentsComponent
          commentsConfig={metadata.comments as CommentsConfig}
        />
      )}
    </>
  );
};

export default Comments;
