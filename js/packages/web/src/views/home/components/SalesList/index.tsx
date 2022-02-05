import { useWallet } from '@solana/wallet-adapter-react';
import { Col, Layout, Row, Tabs, Avatar } from 'antd';
import { UserOutlined, TwitterOutlined, InstagramOutlined, LinkOutlined } from '@ant-design/icons';
import { BsSpotify } from "react-icons/bs";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { LABELS } from '../../../../../src/constants/labels';

import { useMeta } from '../../../../contexts';
import { CardLoader } from '../../../../components/MyLoader';
import { Banner } from '../../../../components/Banner';
import { HowToBuyModal } from '../../../../components/HowToBuyModal';

import { useAuctionsList } from './hooks/useAuctionsList';
import { AuctionRenderCard } from '../../../../components/AuctionRenderCard';

const { TabPane } = Tabs;
const { Content } = Layout;

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
}

export const SalesListView = () => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { isLoading, mainAccountDetail } = useMeta();
  const { connected } = useWallet();
  const { auctions, hasResaleAuctions } = useAuctionsList(activeKey);

  const accoutDetail = () => (
    <div className='account-container'>
      {mainAccountDetail?.bannerImgUrl ? <img className='account-banner' src={mainAccountDetail?.bannerImgUrl} /> : null}
      <div className='account-content'>
        {mainAccountDetail?.profileImgUrl ?
          (<div className="account-avater">
            <Avatar className='account-avater-icon' icon={<UserOutlined />} src={mainAccountDetail?.profileImgUrl} />
          </div>)
          :
          null
        }
        <div>
          <div className='account-name'>
            {mainAccountDetail?.accountName ? mainAccountDetail?.accountName : null}
          </div>
          <div className='account-description'>{mainAccountDetail?.accountDescription ? mainAccountDetail?.accountDescription : null}</div>
          <div className='account-links'>
            {mainAccountDetail?.twitterUrl ? (<a href={mainAccountDetail?.twitterUrl} target="_blank" rel="noreferrer">
              <TwitterOutlined />
            </a>) : null}
            {mainAccountDetail?.instagramUrl ? (<a href={mainAccountDetail?.instagramUrl} target="_blank" rel="noreferrer">
              <InstagramOutlined />
            </a>) : null}
            {mainAccountDetail?.spotifyUrl ? (<a href={mainAccountDetail?.spotifyUrl} target="_blank" rel="noreferrer">
              <BsSpotify />
            </a>) : null}
            {mainAccountDetail?.webUrl ? (<a href={mainAccountDetail?.webUrl} target="_blank" rel="noreferrer">
              <LinkOutlined />
            </a>) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {process.env.MAIN_ACCOUNT_ARWEAVE_TRANSACTION ?
        accoutDetail() : (
        <Banner
          src="/main-banner.svg"
          headingText={`The amazing world of ${LABELS.STORE_NAME}.`}
          subHeadingText={`Buy exclusive ${LABELS.STORE_NAME} NFTs.`}
          actionComponent={<HowToBuyModal buttonClassName="secondary-btn" />}
          useBannerBg
        />
      )}
      
      <Layout>
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col style={{ width: '100%', marginTop: 32 }}>
            <Row>
              <Tabs
                activeKey={activeKey}
                onTabClick={key => setActiveKey(key as LiveAuctionViewState)}
              >
                <TabPane
                  tab={
                    <>
                      <span className="live"></span> Live
                    </>
                  }
                  key={LiveAuctionViewState.All}
                ></TabPane>
                {hasResaleAuctions && (
                  <TabPane
                    tab="Secondary Marketplace"
                    key={LiveAuctionViewState.Resale}
                  ></TabPane>
                )}
                <TabPane tab="Ended" key={LiveAuctionViewState.Ended}></TabPane>
                {connected && (
                  <TabPane
                    tab="Participated"
                    key={LiveAuctionViewState.Participated}
                  ></TabPane>
                )}
              </Tabs>
            </Row>
            <Row>
              <div className="artwork-grid">
                {isLoading &&
                  [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
                {!isLoading &&
                  auctions.map(auction => (
                    <Link
                      key={auction.auction.pubkey}
                      to={`/auction/${auction.auction.pubkey}`}
                    >
                      <AuctionRenderCard auctionView={auction} />
                    </Link>
                  ))}
              </div>
            </Row>
          </Col>
        </Content>
      </Layout>
    </>
  );
};
