import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../../../styles/eventManagementById.module.scss';
import { MdArrowBack } from 'react-icons/md';
import Papa from 'papaparse';

function EventManagementTitle() {
    const router = useRouter();
    const { id } = router.query;
    const [eventTitle, setEventTitle] = useState<string>('');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchEventTitle = async () => {
            if (!id) return;  // 追加: id が存在しない場合はリクエストをスキップ

            try {
                const response = await axios.get(`${apiUrl}/api/event-title/${id}`, {
                    withCredentials: true
                });
                setEventTitle(response.data.title);
            } catch (error) {
                console.error("Error fetching event title", error);
            }
        };

        fetchEventTitle();
    }, [id]);


    const saveTitle = async () => {
        try {
            await axios.patch(`${apiUrl}/api/event-title/${id}`, { title: eventTitle }, {
                withCredentials: true
            });
        } catch (error) {
            console.error("Error updating event title", error);
        }
    };

    return (
        <div>
            <header className={styles.header}>
                <MdArrowBack onClick={() => router.push(`/event/management/${id}/`)} />
                <h2>タイトル</h2>
            </header>
            <main className={styles.main}>
                <div className={styles.inputTitleBox}>
                    <textarea
                        value={eventTitle}
                        onChange={(e) => {
                            setEventTitle(e.target.value);
                            saveTitle();
                        }}
                        className={styles.inputTitle}
                    />
                </div>
            </main>
            <footer className={styles.footer}>
                <button className='bold' onClick={() => router.push(`/event/management/${id}/`)}>戻る（自動保存）</button>
            </footer>
        </div>
    );
}

export default EventManagementTitle;