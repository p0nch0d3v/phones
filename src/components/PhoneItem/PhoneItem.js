
function PhoneItem({site_url, site_id, is_checked, onSiteChange}) {
    if (site_url !== "-") {
        return (
            <div class="input-group mb-1">
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
            </div>
        );
    }
    else {
        return <hr />
    }
};
export default PhoneItem;