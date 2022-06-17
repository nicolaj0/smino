import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import {Todos} from "./Github";

// Create a client
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Todos/>
            </div>
        </QueryClientProvider>

    )
        ;
}

export default App;



