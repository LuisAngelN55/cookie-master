import { useState, ChangeEvent, useEffect, FC } from 'react';
import { Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { MainLayout } from "../components/layout"; 
import Cookies from "js-cookie";
import { GetServerSideProps } from 'next';
import { copyFile } from 'fs';

export default function ThemeChangerPage ( props: object ) {

    console.log({props});

    const [currentTheme, setCurrentTheme] = useState('light')

    const onThemeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const selectedTheme = event.target.value;
        
        setCurrentTheme( selectedTheme );
        
        localStorage.setItem('LS -> theme', selectedTheme);
        Cookies.set( 'theme', selectedTheme );
    }

    useEffect(() => {
      console.log('LocalStorage', localStorage.getItem('theme'));
    
    }, [])
    

    return (
    <MainLayout>
        <Card>
            <CardContent>
                <FormControl>
                    <FormLabel>Tema</FormLabel>
                    <RadioGroup
                        value={ currentTheme }
                        onChange ={ onThemeChange }
                    >
                        <FormControlLabel value='light' control={ <Radio /> } label='light' />
                        <FormControlLabel value='dark' control={ <Radio /> } label='dark' />
                        <FormControlLabel value='custom' control={ <Radio /> } label='custom' />
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>
    </MainLayout>
    )
  }



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    // const { cookies } = ctx.req;
    const { theme = 'light', name = 'No name' } = ctx.req.cookies;





    return {
        props: {
            theme,
            name,
        }
    }
}