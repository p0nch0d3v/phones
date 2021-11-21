import { useEffect, useState } from 'react';
import PhoneItem from '../../components/PhoneItem/PhoneItem';
import data from '../../sites.json';
import { Constants } from '../../Common';
import useHash from '../../UseHash';
import MobileDetect from 'mobile-detect'
import gitInfo from '../../_git_commit';
import './App.css';

function App() {
	var md = new MobileDetect(navigator.userAgent);
	const isMobile = md.mobile() || md.phone() || md.tablet();

	const gitDateFormatted = () => {
		const d = new Date(gitInfo.date);
		return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
	};

	const [hash, setHash] = useHash();
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
		e.preventDefault();
		setPhoneNumber(e.target.value);
	};
	
	const onGoClick = () => {
		sites.forEach((site)=>{
			if (site.checked === true) {
				openSite(site);
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

	const onSiteGoClick = (e) => {
		const site = sites.find((s) => s.id === e);
		openSite(site);
	};

	const openSite = (site) => {
		if (site.url !== "-" && cleanPhoneNumner().length >= 10) {
			setTimeout(() => { 
				const url = site.url.replace(Constants.NumberPlaceHolder, phoneNumber);
				window.open(url, '_blank');
			}, 1);
		}
	}
	
	useEffect(() => {
		let newSites = [...sites];
		newSites.forEach((s) => s.url = s.raw_url.replace(Constants.NumberPlaceHolder, cleanPhoneNumner(phoneNumber)));
		setSites(newSites);
		
		setHash(cleanPhoneNumner(phoneNumber));
	}, [phoneNumber])

	useEffect(() => {
		const phoneOnHash = hash.replace('#', '');
		if (phoneOnHash !== phoneNumber) {
			setPhoneNumber(phoneOnHash);
		}
	}, []);

	return (
	<div class="container-fluid">
		<div class="row mt-3">
			<div class="col-12">
				<div class="input-group mb-1">
					<input type="text" 
						class="form-control" 
						placeholder="Phone number" 
						onChange={onPhoneNumberChange}
						value={phoneNumber}
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
							      onSiteChange={onSiteChange}
								  onSiteGoClick={onSiteGoClick} 
								  isMobile={isMobile}
						/>
		}) }
		<div class="row">
			<div class="col-12">
				<p class="git_info">
					{`${gitInfo.hash} @ ${gitDateFormatted()}`}
				</p>
			</div>
		</div>
	</div>
  );
}

export default App;
