import { Col, Row, Select, Space } from "antd";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import CountUp from 'react-countup';
import MainDashBoard from "../features/dashboard/MainDashBoard";

const HomePage = () => {
    const [sauceHistory, setSauceHistory] = useState<SauceHistory[]>([]);
    const [years, setYears] = useState<datetimeSelectionType[]>([]);
    const [date, setDate] = useState<dateOptionType>({option:"", year:""});
    useEffect(() =>{
        axios.get("http://localhost:8080/hentaibu/api/sauce-history/get-year", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${window.btoa("hentaibu:507c6e34b77b5916c3b791e2ff627114")}`
            }
        })
        .then((res) =>{
            const date : [{year:string}]= res.data;
            const years = date.map(year =>({
                value:year.year,
                label: year.year
            }));
            setYears(years);
        })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/hentaibu/api/sauce-history/get-history?year=${date.year}&dateUpload=${date.option}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${window.btoa("hentaibu:507c6e34b77b5916c3b791e2ff627114")}`
            }
        })
            .then(response => {
                const { data } = response;
                setSauceHistory(data);
            })
    }, [])
    const total: number[] = useMemo(() => {
        return sauceHistory.map(data => data.total);
    }, [sauceHistory, date]);
    const dateFormat: string[] = useMemo(() => {
        return sauceHistory.map(data => {
            const number = data.dateFormat;
            const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, number - 1));
            return monthName;
        });
    }, [sauceHistory, date]);
    const handleChange = (value : string) =>{
        setDate(preDate => ({
            ...preDate,
            year: value
        }))
    }
    console.log(dateFormat);
    
    return (
        <div>
            <Row gutter={[24, 0]}>
                <Col span={6}>
                    <div>
                        <div>
                            <h4> Sauces have been add from today:  <CountUp end={100} duration={3}></CountUp> </h4>
                        </div>
                    </div>
                </Col>
                <Col span={18}>
                    <Space wrap>
                        <h4>Select Date Time For DashBoard</h4>
                        <Select
                            defaultValue={new Date().getFullYear().toString()}
                            style={{ width: 120 }}
                            onChange={handleChange}
                            options={years}
                        />
                        <Select
                            defaultValue="lucy"
                            style={{ width: 120 }}
                            disabled
                            options={[{ value: 'lucy', label: 'Lucy' }]}
                        />

                    </Space>
                </Col>
            </Row>
            <MainDashBoard filterBy="month" dateFormat={dateFormat} total={total} />
        </div>
    );
}

export default HomePage;