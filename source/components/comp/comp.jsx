import React from 'react';

require('./comp.less');

export default function Comp(props) {
  return (<div> { JSON.stringify(props) } </div>);
}
