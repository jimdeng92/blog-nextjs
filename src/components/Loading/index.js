import React from 'react';
import './index.module.scss'

export default function Loading() {
  return (
    <div className="Loading-wrap">
      <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-loading"></use>
      </svg>
      {/* <span className="Loading-text">加载中...</span> */}
    </div>
  )
}
