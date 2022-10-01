import styles from "./WithLabel.module.sass";

/**
 * A component that wraps an children with a label
 */
const WithLabel = ({ label, children }: { label: string; children: any }) => (
  <div className={styles.wrap} key={label}>
    <label htmlFor={label}>{label}</label>
    {children}
  </div>
);

export default WithLabel;
