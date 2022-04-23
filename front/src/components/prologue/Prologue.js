import React, {useEffect, useState} from "react";
import SpeakerChart from './SpeakerChart';
import TopicChart from './TopicChart';
import TopicLikeChart from './TopicLikeChart';
import StudentScore from './StudentScore';
import TopicChange from './TopicChange';
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { brown } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import * as Api from '../../api';

function Prologue() {
  const navigate = useNavigate();

  useEffect(() => {
    Api.get('data', 'student')
      .then(res => console.log(res.data));
  }, []);

  return (
    <div style={{width:'100%', height:'100%', marginTop: 100}}>
      <TopicChange></TopicChange>
      <StudentScore></StudentScore>
      <SpeakerChart></SpeakerChart>
      <TopicChart></TopicChart>
      <TopicLikeChart></TopicLikeChart>
      <GoButton onClick={() => navigate("/media")}>영상 추천받으러 가기</GoButton>
    </div>
  );
}

const GoButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  width: "10vw",
  marginTop:20,
  marginLeft:'50%',
  "&:hover": {
    backgroundColor: brown[700],
  },
}));

export default Prologue;