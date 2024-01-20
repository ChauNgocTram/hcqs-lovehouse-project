import React, { useState, useEffect } from 'react';
import { getNewsDetail } from '../../constant/apiNews';
import OtherNews from '../../components/NewsComponent/OtherNews';

export default function NewsDetail() {
  const [newsDetail, setNewsDetail] = useState({});
  const id = 'dcb77191-dd38-4177-9abc-52aca134804a';

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const data = await getNewsDetail(id);
        if (data && data.result) {
          const formattedData = {
            ...data.result.data,
            date: formatNewsDate(data.result.data.date),
          };
          setNewsDetail(formattedData);
        }
      } catch (error) {
        console.error('Error fetching news detail:', error);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const formatNewsDate = (dateString) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  };

  return (
    <>
    
    <div className="news-detail">
      <div className="mt-35 mb-25 sm:mt-25 sm:mb-15">
        <div className="wrapper max-w-[1200px] px-4 mx-auto">
          <div className="wraps">
            <div className="title text-left animate-delay-200">
              <h1 className='text-4xl font-semibold'>{newsDetail.header}</h1>
            </div>

            <div className="content">
              <div className="dateall">{newsDetail.date}</div>

              <div className="para" dangerouslySetInnerHTML={{ __html: newsDetail.content }}></div>
            </div>
          </div>
        </div>
      </div>
      <OtherNews/>
    </div>
    </>
    
  );
}
