const infoStyle = {
  position: 'absolute',
  left: 0,
  bottom: '40px',
  width: '288px',
  height: '132px',
  marginLeft: '-144px',
  textAlign: 'left',
  overflow: 'hidden',
  fontSize: '12px',
  fontFamily: "'Malgun Gothic', dotum, '돋움', sans-serif",
  lineHeight: '1.5'
};

const wrapStyle = {
  width: '286px',
  height: '120px',
  borderRadius: '5px',
  borderBottom: '2px solid #ccc',
  borderRight: '1px solid #ccc',
  overflow: 'hidden',
  background: '#fff'
};

const titleStyle = {
  padding: '5px 0 0 10px',
  height: '30px',
  background: '#eee',
  borderBottom: '1px solid #ddd',
  fontSize: '18px',
  fontWeight: 'bold'
};

const closeStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#888',
  width: '17px',
  height: '17px',
  background:
    'url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png)'
};

const bodyStyle = {
  position: 'relative',
  overflow: 'hidden'
};

const descStyle = {
  position: 'relative',
  margin: '13px 0 0 90px',
  height: '75px'
};

const ellipsisStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

const jibunStyle = {
  fontSize: '11px',
  color: '#888',
  marginTop: '-2px'
};

const imgStyle = {
  position: 'absolute',
  top: '6px',
  left: '5px',
  width: '73px',
  height: '71px',
  border: '1px solid #ddd',
  color: '#888',
  overflow: 'hidden'
};

const linkStyle = {
  color: '#5085BB'
};

const InfoWindow = () => {
  return (
    <div style={infoStyle} class="wrap">
      <div style={wrapStyle} class="info">
        <div style={titleStyle} class="title">
          카카오 스페이스닷원'
          <div
            style={closeStyle}
            class="close"
            onclick="closeOverlay()"
            title="닫기"
          ></div>
        </div>
        <div style={bodyStyle} class="body">
          <div style={descStyle} class="desc">
            <div style={ellipsisStyle} class="ellipsis">
              제주특별자치도 제주시 첨단로 242
            </div>
            <div style={jibunStyle} class="jibun ellipsis">
              (우) 63309 (지번) 영평동 2181
            </div>
            <div>
              <a
                href="https://www.kakaocorp.com/main"
                target="_blank"
                class="link"
              >
                홈페이지
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoWindow;
