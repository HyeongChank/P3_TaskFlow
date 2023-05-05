import { useNavigate } from "react-router-dom";

const Backdisplay = () =>{
    const c1_s1_style = {
        top: '142px',
        left: '0',
      };
    
      const c1_s2_style = {
        top: '252px',
        left: '157px',
      };
    
      const c1_s3_style = {
        top: '218px',
        left: '320px',
      };
    
      const c1_s4_style = {
        top: '0',
        left: '397px',
      };
    
      const c1_s5_style = {
        top: '110px',
        left: '598px',
      };
    
      const c1_s6_style = {
        top: '292px',
        left: '713px',
      };
    
      const c1_s7_style = {
        top: '143px',
        left: '805px',
      };
    
      const c1_s8_style = {
        top: '136px',
        left: '900px',
      };
      const c1_s9_style = {
        top: `${Math.random() * 1000}px`,
        left: `${Math.random() * 1000}px`,
      };
    
      const c1_s10_style = {
        top: `${Math.random() * 1000}px`,
        left: `${Math.random() * 1000}px`,
      };      
      const c1_s11_style = {
        top: `${Math.random() * 1000}px`,
        left: `${Math.random() * 1000}px`,
      };
    
      const c1_s12_style = {
        top: `${Math.random() * 1000}px`,
        left: `${Math.random() * 1000}px`,
      };            
    
      return (
        <div style={{
            position : 'fixed',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            zIndex: -1,
        }}>
          <div id="early2021">
            <div className="top">
              <div className="inner">
                <div className="c1_s">
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s1.png"
                    className="c1_s1"
                    style={c1_s1_style}
                  />
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s2.png"
                    className="c1_s2"
                    style={c1_s2_style}
                  />
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s3.png"
                    className="c1_s3"
                    style={c1_s3_style}
                  />
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s4.png"
                    className="c1_s4"
                    style={c1_s4_style}
                  />
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s5.png"
                    className="c1_s5"
                    style={c1_s5_style}
                  />
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s6.png"
                    className="c1_s6"
                    style={c1_s6_style}
                  />
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s7.png"
                    className="c1_s7"
                    style={c1_s7_style}
                  />
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s8.png"
                    className = "c1_s7"
                    style={c1_s8_style}
                  />
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s1.png"
                    className = "c1_s9"
                    style={c1_s9_style}
                  />
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s2.png"
                    className = "c1_s10"
                    style={c1_s10_style}
                  />  
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s3.png"
                    className = "c1_s11"
                    style={c1_s11_style}
                  />
                  <img
                    src="http://img247.etoos.com/web/w247/images/cnt/recruit/early2021/c1_s4.png"
                    className = "c1_s12"
                    style={c1_s12_style}
                  />                                                      
                </div>    
                </div>
                </div>
            </div>
        </div>
      )
}
export default Backdisplay;