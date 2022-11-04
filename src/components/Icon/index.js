import React from 'react'
import * as icons from 'lucide-react';
import PropTypes from 'prop-types'
import styles from './index.module.css'

const Icon = ({ name, color, size = 16 }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} className={styles.Icon} />;
};

export default Icon;

Icon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number
}
