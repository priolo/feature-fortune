import featureListSo from '@/stores/feature/list';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const FeatureListPag: React.FC = () => {

	// STORES
	useStore(featureListSo)

	// HOOKS
	const navigate = useNavigate()

	// HOOCKS
	useEffect(() => {
		featureListSo.fetch()
	},[])

	// HANDLERS
	const handleCreate = async () => {
		//await featureListSo.create()
		navigate('/app/feature')
	}


	// RENDER

	const features = featureListSo.state.all ?? [];

	return (
		<div className="page">
			<div className="page-header">
				<h1>Dashboard</h1>
				<button className="refresh-button" onClick={handleCreate}>NUOVO</button>
			</div>

			<div className="dashboard-grid">
				<div className="card">
					<h3>Total Revenue</h3>
					<div className="metric">$24,500</div>
					<div className="metric-change positive">+12.5%</div>
				</div>

				<div className="card">
					<h3>Active Users</h3>
					<div className="metric">1,423</div>
					<div className="metric-change positive">+8.2%</div>
				</div>

				<div className="card">
					<h3>Orders</h3>
					<div className="metric">89</div>
					<div className="metric-change negative">-3.1%</div>
				</div>

				<div className="card">
					<h3>Conversion Rate</h3>
					<div className="metric">3.2%</div>
					<div className="metric-change positive">+0.5%</div>
				</div>
			</div>

			<div className="recent-activity">
				<h2>Recent Activity</h2>
				<div className="activity-list">

					{features.map((feature) => (
						<div key={feature.id} className="activity-item">
							<div className="activity-icon">📦</div>
							<div className="activity-content">
								<div className="activity-title">{feature.title}</div>
								<div className="activity-time">{feature.description}</div>
							</div>
						</div>
					))}

				</div>
			</div>
		</div>
	);
};

export default FeatureListPag;