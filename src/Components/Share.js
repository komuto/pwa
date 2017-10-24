import React from 'react'
import { ShareButtons, generateShareIcon } from 'react-share'

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')
const TelegramIcon = generateShareIcon('telegram')
const WhatsappIcon = generateShareIcon('whatsapp')

class Share extends React.Component {
  render () {
    const { share, shareProduct, onShow } = this.props
    const shareUrl = share.link
    const title = share.title
    return (
      <div className='sort-option' style={{ display: onShow && 'block' }}>
        <div className='notif-report add-voucher'>
          <div className='header-notif'>
            <h3>Bagikan</h3>
            <span className='icon-close' onClick={() => shareProduct()} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              style={{ padding: '5px 5px 5px 5px' }}>
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={title}
              style={{ padding: '5px 5px 5px 5px' }}>
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>
            <TelegramShareButton
              url={shareUrl}
              title={title}
              style={{ padding: '5px 5px 5px 5px' }}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              style={{ padding: '5px 5px 5px 5px' }}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <GooglePlusShareButton
              url={shareUrl}
              title={title}
              style={{ padding: '5px 5px 5px 5px' }}>
              <GooglePlusIcon
                size={32}
                round />
            </GooglePlusShareButton>
            <LinkedinShareButton
              url={shareUrl}
              title={title}
              style={{ padding: '5px 5px 5px 5px' }}>
              <LinkedinIcon
                size={32}
                round />
            </LinkedinShareButton>
          </div>
        </div>
      </div>
    )
  }
}

export default Share
