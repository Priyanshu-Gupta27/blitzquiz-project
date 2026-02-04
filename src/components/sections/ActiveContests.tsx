import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './ActiveContests.module.css';

export default function ActiveContests() {
    const contests = [
        {
            id: 1,
            tag: 'DEV',
            title: 'test practice contest',
            description: 'this is a test practice contest created by user...',
        },
        {
            id: 2,
            tag: 'DEV',
            title: 'practice contest from frontend',
            description: 'this is another practice contest created straight from front...',
        },
        {
            id: 3,
            tag: 'DEV',
            title: 'this is practice 2 try 2',
            description: 'this is created from frontend , try 2 ...',
        },
    ];

    return (
        <section className={styles.activeContests}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Active Contests</h2>
                    <Link href="/contests" className={styles.viewAll}>
                        View all <ArrowRight size={16} />
                    </Link>
                </div>
                <div className={styles.grid}>
                    {contests.map((contest) => (
                        <div key={contest.id} className={styles.card}>
                            <div className={styles.badge}>{contest.tag}</div>
                            <h3 className={styles.cardTitle}>{contest.title}</h3>
                            <p className={styles.cardDescription}>{contest.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
