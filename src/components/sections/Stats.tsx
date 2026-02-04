import styles from './Stats.module.css';

export default function Stats() {
    const stats = [
        { value: '10K+', label: 'Developers' },
        { value: '500+', label: 'Contests' },
        { value: '50K+', label: 'Problems' },
    ];

    return (
        <div className={styles.stats}>
            <div className={styles.container}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statItem}>
                        <div className={styles.value}>{stat.value}</div>
                        <div className={styles.label}>{stat.label}</div>
                        {index < stats.length - 1 && <div className={styles.divider} />}
                    </div>
                ))}
            </div>
        </div>
    );
}
