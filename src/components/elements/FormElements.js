
import styles from './FormElements.module.scss';

export const Input = ({ id, title, placeholder, register, rules, errors }) => {
  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <label htmlFor={id}>{title}</label>
        {errors[id] && (
          <div className={styles.feedback}> (* {errors[id]?.message})</div>
        )}
      </div>
      <div className={styles.input}>
        <input
          id={id}
          name={id}
          placeholder={placeholder}
          {...register(id, rules)}
        />
      </div>
    </div>
  )
}