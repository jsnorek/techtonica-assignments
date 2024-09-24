import React from "react";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

        
        

function Contact() {

    return (
        <div className="card">
            <h4>Card</h4>
            <Card title="Contact Card" subTitle="Name">
                <p className="info">
                    extra information
                </p>
                <Button label="More Details" />
            </Card>
        </div>
    )
}

export default Contact;