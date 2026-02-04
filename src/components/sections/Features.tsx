import styles from './Features.module.css';

export default function Features() {
    const features = [
        {
            title: 'Real-time Competition',
            description: 'Compete head-to-head with developers worldwide. Live rankings update as you solve.',
        },
        {
            title: 'Track Your Growth',
            description: 'Watch your skills compound over time. Every problem solved is progress earned.',
        },
        {
            title: 'DSA & Development',
            description: 'From algorithms to full-stack challenges. Build the skills that matter most.',
        },
        {
            title: 'Learn by Doing',
            description: 'Theory only takes you so far. Practice under pressure makes perfect.',
        },
    ];

    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Why blitzquiz?</h2>
                    <p className={styles.subtitle}>Get 1% better every day.</p>
                </div>
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureItem}>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
