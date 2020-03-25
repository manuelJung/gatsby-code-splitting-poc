import * as React from 'react'

export default function TemplateA ({widgets}) {
  const {WidgetA} = widgets
  return (
    <div>
      <WidgetA/>
      <p>TemplateA</p>
    </div>
  )
}