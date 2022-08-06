import React from 'react';

export default class GoogleAd extends React.Component {
    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render () {
        return (
            <ins className="adsbygoogle"
                 style={{ display: 'block', textAlign: 'center'}}
                 data-ad-layout="in-article"
                 data-ad-format="fluid"
                 data-ad-client="ca-pub-1371301044344210"
                 data-ad-slot="1346194813"></ins>
        );
    }
}