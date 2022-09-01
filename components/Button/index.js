import styles from './styles.module.css'
const Wrapper = props =>
  props.type === 'div'
    ? <div {...props}>{props.children}</div>
    : <button {...props}>{props.children}</button>

export default function Button ({ altText, color, disabled, handleClick, icon, text, type }) {
  const palette = {
    cyan: `${styles.cyan}`,
    green: `${styles.green}`,
    red: `${styles.red}`
  }
  const textStyles = altText ? styles.altText : styles.text

  return (
    <Wrapper
      className={`${styles.btn} ` + palette[color]}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      <i className={icon} />
      {text && <span className={textStyles}>{text}</span>}
    </Wrapper>
  )
}
