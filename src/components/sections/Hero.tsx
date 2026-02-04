import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.badge}>
                    CODING COMPETITION PLATFORM
                </div>
                <h1 className={styles.title}>
                    Compete with developers
                    <span className={styles.gradientText}>around the world</span>
                </h1>
                <p className={styles.description}>
                    Join live coding contests, solve algorithmic challenges, and
                    prove your skills on the global leaderboard.
                </p>
                <div className={styles.actions}>
                    <Link href="/contests" className={styles.primaryBtn}>
                        Browse Contests
                    </Link>
                    <Link href="/practice" className={styles.secondaryBtn}>
                        Practice with AI
                    </Link>
                </div>
            </div>
        </section>
    );
}
