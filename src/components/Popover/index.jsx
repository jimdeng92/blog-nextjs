import React, { useState, useEffect, useRef } from 'react'
import { createPopper } from '@popperjs/core'
import PropTypes from 'prop-types'
import styles from './index.module.scss'

const Popover = (props) => {
  const [popperInstance, setPopperInstance] = useState(null)
  const referenceElement = useRef(null)
  const popperElement = useRef(null)

  function show () {
    popperElement.current.setAttribute('data-show', '')

    popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true }
      ]
    }))

    popperInstance.update()
  }

  function hide () {
    popperElement.current.removeAttribute('data-show')

    popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false }
      ]
    }))
  }

  useEffect(() => {
    console.log('useEffect1')
    const instance = createPopper(referenceElement.current, popperElement.current, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }
      ]
    })

    setPopperInstance(instance) // 会触发组件更新
  }, [])

  useEffect(() => {
    console.log('useEffect2')
    const showEvents = ['mouseenter', 'focus']
    const hideEvents = ['mouseleave', 'blur']

    // 添加判断，防止 popperInstance 为 null 的时候添加事件导致报错
    if (popperInstance) {
      showEvents.forEach((event) => {
        referenceElement.current.addEventListener(event, show)
      })

      hideEvents.forEach((event) => {
        referenceElement.current.addEventListener(event, hide)
      })
    }
  }, [popperInstance])

  return (
    <>
      <div ref={referenceElement} aria-describedby="tooltip" className={styles.reference}>
        {props.children}
      </div>
      <div role="tooltip" ref={popperElement} className={styles.tooltip}>
        {props.tooltip}
        <div className={styles.arrow} data-popper-arrow></div>
      </div>
    </>
  )
}

export default Popover

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.node.isRequired
}
