import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Activity, Clock, Cpu } from 'lucide-react';
import GlassmorphCard from './GlassmorphCard'; // Assuming in same directory or adjust import

const ServerStats = () => {
    // Mock Data State
    const [stats, setStats] = useState({
        cpu: 24,
        memory: 42,
        latency: 45,
        uptime: '99.9%'
    });

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                cpu: Math.min(100, Math.max(10, prev.cpu + (Math.random() * 10 - 5))),
                memory: Math.min(100, Math.max(20, prev.memory + (Math.random() * 6 - 3))),
                latency: Math.max(10, prev.latency + (Math.random() * 20 - 10))
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const StatusDot = ({ status = 'online' }) => (
        <span className={`status-dot ${status}`}>
            <span className="pulse"></span>
        </span>
    );

    return (
        <GlassmorphCard className="server-stats-card" hover={false}>
            <div className="stats-header">
                <div className="header-icon">
                    <Activity size={20} className="icon-pulse" />
                </div>
                <h3>System Health</h3>
                <div className="system-badge">
                    <span className="dot"></span> All Systems Operational
                </div>
            </div>

            <div className="stats-grid-compact">
                {/* CPU Metric */}
                <div className="stat-unit">
                    <div className="unit-header">
                        <Cpu size={16} />
                        <span>CPU Load</span>
                    </div>
                    <div className="unit-bar-wrapper">
                        <motion.div
                            className="unit-bar-fill cpu"
                            animate={{ width: `${stats.cpu}%` }}
                            transition={{ type: "spring", stiffness: 50 }}
                        />
                    </div>
                    <div className="unit-value">{stats.cpu.toFixed(1)}%</div>
                </div>

                {/* Memory Metric */}
                <div className="stat-unit">
                    <div className="unit-header">
                        <Database size={16} />
                        <span>Memory</span>
                    </div>
                    <div className="unit-bar-wrapper">
                        <motion.div
                            className="unit-bar-fill memory"
                            animate={{ width: `${stats.memory}%` }}
                            transition={{ type: "spring", stiffness: 50 }}
                        />
                    </div>
                    <div className="unit-value">{stats.memory.toFixed(1)}%</div>
                </div>

                {/* Latency Metric */}
                <div className="stat-unit">
                    <div className="unit-header">
                        <Server size={16} />
                        <span>Latency</span>
                    </div>
                    <div className="unit-value-large positive">
                        {stats.latency.toFixed(0)} <span className="unit">ms</span>
                    </div>
                    <div className="unit-status">Normal</div>
                </div>

                {/* Uptime Metric */}
                <div className="stat-unit">
                    <div className="unit-header">
                        <Clock size={16} />
                        <span>Uptime</span>
                    </div>
                    <div className="unit-value-large">
                        {stats.uptime}
                    </div>
                    <div className="unit-status positive">Stable</div>
                </div>
            </div>

            <style>{`
                .server-stats-card {
                    background: var(--card-bg) !important; /* Ensure Dark Theme */
                    border: var(--glass-border) !important;
                }
                
                .stats-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    padding-bottom: 16px;
                }
                
                .header-icon {
                    width: 36px;
                    height: 36px;
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .icon-pulse {
                    animation: pulse 2s infinite;
                }
                
                .system-badge {
                    margin-left: auto;
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .system-badge .dot {
                    width: 6px;
                    height: 6px;
                    background: #10b981;
                    border-radius: 50%;
                    box-shadow: 0 0 8px #10b981;
                }

                .stats-grid-compact {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                }

                .stat-unit {
                    background: rgba(0,0,0,0.2);
                    padding: 16px;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .unit-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    color: var(--text-secondary);
                }

                .unit-bar-wrapper {
                    height: 6px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 3px;
                    overflow: hidden;
                    margin-top: 4px;
                }
                
                .unit-bar-fill {
                    height: 100%;
                    border-radius: 3px;
                }
                
                .unit-bar-fill.cpu { background: #0ea5e9; }
                .unit-bar-fill.memory { background: #8b5cf6; }
                
                .unit-value {
                    font-size: 14px;
                    font-weight: 700;
                    margin-top: 2px;
                }
                
                .unit-value-large {
                    font-size: 20px;
                    font-weight: 700;
                    color: #f8fafc;
                }
                
                .unit-value-large.positive { color: #10b981; }
                
                .unit-value-large .unit {
                    font-size: 12px;
                    color: var(--text-secondary);
                    font-weight: 400;
                }

                .unit-status {
                    font-size: 11px;
                    color: var(--text-secondary);
                }
                
                .unit-status.positive { color: #10b981; }

                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }

                @media (max-width: 480px) {
                    .stats-grid-compact {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </GlassmorphCard>
    );
};

export default ServerStats;
