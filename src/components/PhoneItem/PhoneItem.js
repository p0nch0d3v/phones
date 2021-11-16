import { useState } from 'react';

function PhoneItem(
    {
        site_url, 
        site_id, 
        is_checked, 
        onSiteChange, 
        onSiteGoClick,
        isMobile
    }) {
    const [hover, setHover] = useState(false);

    if (site_url !== "-") {
        return (
            <div class="input-group mb-1" 
                 onMouseEnter={()=> setHover(true)} 
                 onMouseLeave={()=> setHover(false)}>
                <div class="input-group-text">
                <input class="form-check-input mt-0" 
                        type="checkbox" 
                        value={site_url}
                        checked={is_checked} 
                        onChange={() => onSiteChange(site_id)}
                        id={site_id} />
                </div>
                <label class="form-control" 
                       for={site_id}>{site_url}</label>	
                { !isMobile && hover && 
                    (
                        <div class="input-group-append">
				            <button class="btn btn-secondary" 
						            type="button"
                                    onClick={() => onSiteGoClick(site_id)}
                                    >Go</button>
					        </div>
                    ) 
                }
            </div>
        );
    }
    else {
        return <hr />
    }
};
export default PhoneItem;