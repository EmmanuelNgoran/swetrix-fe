import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import cx from 'clsx'
import { getItem } from 'utils/localstorage'

const Tooltip = ({
  text, className, tooltipNode,
}) => {
  const [language, setLanguage] = useState(getItem('language'))

  useEffect(() => {
    setLanguage(getItem('language'))
  }, [text])

  return (
    <div className={cx(
      'w-5 h-5 relative flex flex-col group',
      className,
      {
        'items-end': language === 'el',
        'items-center': language !== 'el',
      },
    )}
    >
      {tooltipNode || (
      <QuestionMarkCircleIcon className='w-5 h-5 text-gray-700  dark:text-gray-300' />
      )}
      <div className={cx('absolute bottom-0 flex-col mb-6 hidden group-hover:flex', {
        'items-end': language === 'el',
        'items-center': language !== 'el',
      })}
      >
        <span className='relative w-60 z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-700 shadow-lg rounded-md'>
          {text}
        </span>
        <div className={cx('w-3 h-3 -mt-2 rotate-45 bg-gray-700', {
          'mr-1': language === 'el',
        })}
        />
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  tooltipNode: PropTypes.node,
}

Tooltip.defaultProps = {
  className: '',
  tooltipNode: null,
}

export default memo(Tooltip)
