import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CurrentCompetition = () => {
    useEffect(() => {
        console.log(id);

        // eslint-disable-next-line
    }, []);

    let { id } = useParams();

    return (
        <div>
            <div style={{ padding: '1rem' }}>
                <p>Current Competition Page</p>
                <p>{id}</p>
            </div>
        </div>
    );
};

export default CurrentCompetition;
