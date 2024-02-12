import React, { useState, useEffect } from 'react';
import axios from 'axios';

const General = () => {
    const [groupData, setGroupData] = useState(undefined);
    const [weekData, setWeekData] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const groupResult = await axios('group_data.json');
                const weekResult = await axios('week_data.json');

                setGroupData(groupResult.data);
                setWeekData(weekResult.data);
            } catch (error) {
                console.error("Error loading data", error);
            }
        };

        fetchData();
    }, []);

    const getWeek = (date) => {
        return weekData.day1.includes(date) ? '1' : '2';
    };

    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];

    const DayBlock = React.memo(({ dayData, date, index }) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const id = day + month + year;

        const formattedDate = date.toLocaleDateString('ru-RU');
        const week = getWeek(id);

        return (
            <div key={formattedDate} id={id} className="block-content">
                <text className="text-data">
                    {index === 0 && <span style={{ color: 'var(--green)' }}>Сегодня</span>}
                    {index === 1 && <span style={{ color: 'var(--red)' }}>Завтра</span>}
                    {index > 1 && <span style={{ color: 'var(--white)' }}>{days[date.getDay()]}</span>}
                    , {formattedDate}, Неделя {week}
                </text>
                {dayData && dayData.data.length > 0 ? (
                    dayData.data.map((data, index) => {
                        return data.week.map(String).includes(week) && (
                            <div key={index} className="box-content">
                                <div className="p-time">
                                    <text className="p-start">{data.start}</text>
                                    <text className="p-end">{data.end}</text>
                                </div>
                                <div className="p-idicator" style={{ backgroundColor: `var(--${data.color})` }}></div>
                                <div className="p-name">
                                    <text className="p-name-a">{data.name} {data.subgroup.length < 2 && `(г.${data.subgroup[0]})`}</text>
                                    <text className="p-name-b">{data.place}</text>
                                </div>
                                <div className="tooltip-left">
                                    <element width="150px;">{data.teacher}</element>
                                    <button className="HOVER p-avatar" style={{ backgroundImage: `url('https://bntu.sworroo.me/teachers/${data.image}.png')` }}>
                                        <span style={{ left: '84.5px', top: '42px' }}></span>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <text className="text-data">Занятий нет или они не загружены!</text>
                )}
            </div>
        );
    });

    return (
        <>
            {groupData && weekData && Array.from({ length: 28 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const dayData = groupData.find(d => d.day === date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase());
                console.log(dayData)
                return <DayBlock dayData={dayData} date={date} index={i} />;
            })}
        </>
    );
};

export default General;
