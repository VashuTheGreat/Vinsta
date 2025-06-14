import React from 'react';
import Navbar from './Navbar';
import { View,ScrollView } from 'react-native';
import Stories from './stories';
import Post from './post'


const MySvgIcon = () => {
  return (
    <ScrollView>
        <Navbar/>
<Stories/>  
<Post/>   
    </ScrollView>
  );
};

export default MySvgIcon;
