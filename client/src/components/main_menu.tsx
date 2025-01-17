import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ApiResponse from '../models/api_response';
import ApiList from '../models/api_list';
import CreateFirstList from './create_first_list';

export default class MainMenu extends React.Component {

    state = {
        value: 0,
        lists: [],
    }

    constructor(props: any) {
        super(props);
        this.state = { value: 0, lists: [] };
        fetch('/api/v1/lists')
        .then((res) => {
            console.log(`Response: ${res.status}`);
            console.log(`Response: ${res}`);
            return res.json();
        })
        .then((data: ApiResponse) => {
            console.log(data);
            if(data.status === 200){
                this.setState({lists: data.data});
            }
        });
    }

    handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        this.setState({ value: newValue });
    }

    getButtonFirstList() {
        console.log("Create List");
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <CreateFirstList />
            </Box>
        );
    }

    getTabs() {
        const tabs = this.state.lists.map((list: ApiList) => {
            return <Tab key={list.id} label={list.name} />
        });
        console.log("Tabs");
        console.log(tabs);
        console.log("Lists");
        console.log(this.state.lists);
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    sx={{
                        maxWidth: { xs: 320, sm: 480 },
                        bgcolor: 'background.paper'
                    }}
                >
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                    >
                        <Tab onClick={() => { console.log("Item One") }} label="Item One" />
                        {tabs}
                    </Tabs>
                </Box>
            </Box>
        );

    }

    render() {
        if (this.state.lists.length === 0) {
            return this.getButtonFirstList();
        }
        return this.getTabs();
    }
}
