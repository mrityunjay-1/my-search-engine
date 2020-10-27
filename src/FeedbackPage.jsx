import React, { useState } from 'react';

const FeedbackPage = () => {

    const [select_tag, set_select_tag] = useState("select");
    const [textarea_tag, set_textarea_tag] = useState("");

    const submit_form = (e) => {
        e.preventDefault();

        const data = {
            select_tag,
            textarea_tag
        }

        fetch(`http://localhost/work_with_apis/REST_api/create_data.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => { console.log(data); alert(data.result) }).catch(error => console.log(error));

        document.querySelector("#feedback-container").style.display = "none";
    }

    return (
        <>
            <form onSubmit={submit_form}>
                <div id="feedback-container" style={{ display: 'none', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', width: '100%', background: 'rgba(0, 0, 0, 0.7)', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '30%', backgroundColor: 'white', padding: '3%', borderRadius: '0.5rem' }}>
                        <div onClick={() => {
                            document.querySelector("#feedback-container").style.display = "none";
                        }} style={{ position: 'absolute', fontSize: '3rem', top: '2%', right: '5%', cursor: 'pointer' }}> &times; </div>
                        <div >
                            <h1 style={{ padding: '5% 0%' }}> What Went Wrong ? </h1>
                        </div>
                        <div style={{ padding: '5% 0%' }}>
                            <select value={select_tag} onChange={(e) => { set_select_tag(e.target.value); }} style={{ width: '100%', fontSize: '2.4rem' }} >
                                <option value="select"> Select the Issue </option>
                                <option value="Bug"> Bug </option>
                                <option value="Continuous Lag">Continuous Lag</option>
                                <option value="Not proper resuls"> Not proper resuls </option>
                                <option value="Feedback"> Feedback </option>
                                <option value="Others"> others </option>
                            </select>
                        </div>
                        <div id="textarea">
                            <textarea placeholder="describe here" value={textarea_tag} style={{ width: '100%', height: '8rem' }} onChange={(e) => { set_textarea_tag(e.target.value) }}>  </textarea>
                        </div>
                        <div style={{ padding: '5% 0%' }}> <button style={{ width: '100%', fontSize: '2.4rem' }}> Submit </button> </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default FeedbackPage;