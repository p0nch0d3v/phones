import { useState } from 'react';
import PhoneItem from '../../components/PhoneItem/PhoneItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '../../sites.json';
import { Constants } from '../../Common';

function App() {
	const cleanPhoneNumner = (_phoneNumber) => (_phoneNumber || phoneNumber).replace(/[^\d]/gi, "");
	const [phoneNumber, setPhoneNumber] = useState('');
	const [sites, setSites] = useState(
		data.map((s,i) => {
			return {
				index: i,
				id: `site_${i}`,
				raw_url: s.name,
				url: s.name.replace(Constants.NumberPlaceHolder, cleanPhoneNumner()),
				checked: false
			}
		})
	);

	const isAnySiteChecked = () => sites.some((s) => s.checked === true);

	const onPhoneNumberChange = (e) => {
		setPhoneNumber(e.target.value);
		
		let newSites = [...sites];
		newSites.forEach((s) => s.url = s.raw_url.replace(Constants.NumberPlaceHolder, cleanPhoneNumner(e.target.value)));
		setSites(newSites);
	};
	
	const onGoClick = () => {
		sites.forEach((s)=>{
			if (s.checked === true) {
				setTimeout(() => { 
					window.open(s.url.replace(Constants.NumberPlaceHolder, phoneNumber, '_blank'));
				}, 1);
			}
		});
	};

	const onSiteChange = (e) => {
		let newSites = [...sites];
		const siteIndex = newSites.findIndex((s) => s.id === e);
		newSites[siteIndex].checked = !newSites[siteIndex].checked;
		setSites(newSites);
	};

	const onSelectAllChange = (e) => {
		const checked = e.target.checked;
		let newSites = [...sites];
		newSites.forEach((s) =>  s.checked = checked);
		setSites(newSites);
	};

	return (
	<div class="container-fluid">
		<div class="row mt-3">
			<div class="col-12">
				<div class="input-group mb-1">
					<input type="text" 
						class="form-control" 
						placeholder="Phone number" 
						onChange={onPhoneNumberChange}
						id="number"/>
					<div class="input-group-append">
						<button class="btn btn-primary" 
						        type="button" 
								onClick={onGoClick}
								disabled={cleanPhoneNumner().length < 10 || isAnySiteChecked() === false}
								id="btnGo">Go</button>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-12" id="source_list">
				<div class="input-group mb-1">
					<div class="input-group-text">
					  <input class="form-check-input mt-0" 
							   type="checkbox" 
							   id="select_all_sources" 
							   onChange={onSelectAllChange}/>
					</div>
					<label class="form-control"
					       for="select_all_sources">
						   Select All
					</label>
				 </div>
			</div>
		</div>
		{ sites.map((s, i) => {
				return <PhoneItem site_url={s.url} 
								  site_id={s.id}
								  is_checked={s.checked}
							      onSiteChange={onSiteChange} />
		}) }
	</div>
  );
}

export default App;
