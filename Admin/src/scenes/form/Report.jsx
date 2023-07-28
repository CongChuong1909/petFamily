import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { Avatar, Box, Tab, Tabs } from '@mui/material';
import moment from "moment";
import ReportImage from './ReportImage';


export default function Report() {
  const [expanded, setExpanded] = useState([]);
  const queryClient = useQueryClient();
  const [value, setValue] = useState('one');
  const [choise, setChoise] = useState(1);

  const handleChangeTab = (event, newValue) => {
    setChoise(newValue === "one" ? 1 : newValue === 'two' ? 2 : 0);
    setValue(newValue);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => {
      if (isExpanded) {
        return [...prevExpanded, panel];
      } else {
        return prevExpanded.filter((item) => item !== panel);
      }
    });
  };

  const mutationUpdate = useMutation(
    (updateStatus) => {
      return makeRequest.put("/report/updateReport", updateStatus);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["report"]);
      },
    },
  );



  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await makeRequest.get(`/report/getList?status=${choise}`);
        queryClient.setQueryData(["report"], response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchReportData();
  }, [choise, queryClient]);

  const reportData = useQuery({
    queryKey: ["report"],
    queryFn: () =>
      makeRequest.get(`/report/getList?status=${choise}`).then((res) => {
        return res.data;
      })
  });

  const handleSkip = (id) => {
    const value = {
      idreport: id,
      status: 2
    };
    mutationUpdate.mutate(value);
  };

  const handleDelete = (id) => {
    const value = {
      idreport: id,
      status: 0
    };
    mutationUpdate.mutate(value);
  };

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          aria-label="wrapped label tabs example"
          indicatorColor="secondary"
          textColor='secondary'
        >
          <Tab 
            value="one"
            label="Processing"
          />
          <Tab value="two" label="Has been skipped" />
          <Tab value="three" label="Has been deleted" />
        </Tabs>
      </Box>
     
      {reportData.isLoading ? (
        <img src="https://media2.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif" alt="" />
      ) : (
        reportData.data.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded.includes(index)}
            onChange={handleChange(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {item.content}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {moment(item.created_at).format('LLL')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="report-container border-b border-[#777] pb-2">
                <div className="flex items-center gap-2">
                  <div className='title_report'>Reporter:</div>
                  <div className="flex items-center gap-3">
                    <Avatar src={item.avatarReporter} className="report-avatar" />
                    <p>{item.nameReporter}</p>
                  </div>
                </div>
                <div className="report-item">
                  <div></div>
                  <div className="report-text">
                   <span className='font-bold'>content:</span> {item.description}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start mt-4">
                <div className="flex items-center gap-2">
                  <div className='title_report'>Poster:</div>
                  <div className="flex gap-4 items-center">
                    <Avatar src={item.avatarPoster} className="report-avatar" />
                    <p>{item.namePoster}</p>
                  </div>
                </div>
                <div className="report-item">
                  <div></div>
                  <div className='report-item_postcontent items-center'>
                    <div className="report-text mt-2">
                      <div>
                        <strong>Content: </strong>
                        {item.textcontent}
                      </div>
                      <div>
                        <strong>ID post: </strong>
                        <span className='underline  decoration-blue decoration-solid'>iahcu_ca</span>
                      </div>
                    </div>
                    <ReportImage idpost={item.idpost} />
                  </div>
                </div>
              </div>
              <div className='flex gap-3 justify-end'>
                <button onClick={() => handleSkip(item.idreport)} className='text-[#fff] p-3 rounded-lg bg-[#378839]'>SKIP</button>
                <button onClick={() => handleDelete(item.idreport)} className='text-[#fff] p-3 rounded-lg bg-[#be2e24]'>DELETE POST AND NOTIFICATION</button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
}
