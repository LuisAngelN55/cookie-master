import { useState, ChangeEvent, useEffect, FC } from 'react';
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { MainLayout } from "../components/layout"; 
import Cookies from "js-cookie";
import { GetServerSideProps } from 'next';
import axios from 'axios';

interface Props {
    theme: string;
    name: string;
}

export default function ThemeChangerPage ( { theme }: Props ) {

    const [currentTheme, setCurrentTheme] = useState( theme )

    const onThemeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const selectedTheme = event.target.value;
        
        setCurrentTheme( selectedTheme );
        
        localStorage.setItem('theme', selectedTheme);
        Cookies.set( 'theme', selectedTheme );
    }

    const onClick = async() => {
        const { data } = await axios.get('/api/hello');
        console.log({ data });
    }

    useEffect(() => {
      console.log('LocalStorage', localStorage.getItem('theme'));
      console.log('Cookies', Cookies.get('theme'));
    
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

                <Button
                    onClick={ onClick}
                >
                    Solicitud
                </Button>

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


    const validThemes = [ 'light', 'dark', 'custom' ];


    return {
        props: {
            theme: validThemes.includes( theme ) ? theme : 'dark',
            name,
        }
    }
}