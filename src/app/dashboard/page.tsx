'use client';

import { useState, useEffect, useRef } from 'react';
import { getLabels } from '@/app/utils/localization';
import Chart from 'chart.js/auto';
import StreamingPlugin from 'chartjs-plugin-streaming';
import 'chartjs-adapter-date-fns';
import { enUS, ja, zhTW } from 'date-fns/locale'
// import { Button, Card, CardContent, Typography } from "@mui/material";
Chart.register(StreamingPlugin);

import { Line } from 'react-chartjs-2';

export default function Dashboard() {
  interface Resource {
    id: string;
    type: string;
    status: string;
    name?: string;

    node?: string;

    maxcpu?: number;
    cpu?: number;
    maxmem?: number;
    mem?: number;
  }

  const [resources, setResources] = useState<Resource[]>([]);

  const [currentResourceId, setCurrentResourceId] = useState<string | null>(null);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);

  const [language, setLanguage] = useState<string>('en');

  const chartDataRef = useRef<{ cpu: { x: number, y: number }[], mem: { x: number, y: number }[] }>({
    cpu: [{ x: Date.now(), y: 0 }],
    mem: [{ x: Date.now(), y: 0 }]
  });

  useEffect(() => {
    const browserLanguage = navigator.language;
    setLanguage(browserLanguage);
  }, []);

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch('/api/resources');
        const data = await response.json();
        setResources(data || []);
      } catch (error) {
        console.error('Error fetching realms:', error);
      } finally {
        setTimeout(() => {
          fetchResources();
        }, 5000);
      }
    }
    fetchResources();
  }, []);

  useEffect(() => {
    if (currentResourceId) {
      const resource = resources.find(resource => resource.id === currentResourceId);
      if (resource) {
        setCurrentResource(resource);
      }
    }
  }, [resources]);

  const onResourceClick = (resource: Resource) => {
    setCurrentResourceId(resource.id);
    setCurrentResource(resource);

    chartDataRef.current.cpu = [{ x: Date.now(), y: 0 }];
    chartDataRef.current.mem = [{ x: Date.now(), y: 0 }];
  };

  const currentLabels = getLabels(language);
  return (
    <div className="flex">
      <div>
        <div className="p-6 rounded-lg shadow-md w-96" style={{ backgroundColor: "var(--surface)", color: "var(--onBackground)" }}>
          <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "var(--primary)" }}>{currentLabels.dashboard}</h2>
        </div>
        <div className="flex w-3/4"></div>
        <div style={{ backgroundColor: "var(--surface)", color: "var(--onBackground)" }}>
          <h3 className="text-xl font-bold mb-2 text-center" style={{ color: "var(--primary)" }}>{currentLabels.vmList}</h3>
          {resources.filter(resource => resource.type === 'qemu').map(resource => (
            <div onClick={() => onResourceClick(resource)} key={resource.id} className="p-2 my-2 rounded-lg m-2" style={{ backgroundColor: currentResourceId === resource.id ? "var(--tertiaryContainer)" : "var(--surface)", color: currentResourceId === resource.id ? "var(--onTertiaryContainer)" : "var(--onBackground)" }}>
              <p>{resource.id} {resource.name && `(${resource.name})`}</p>
              <p>{resource.status}</p>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: "var(--surface)", color: "var(--onBackground)" }}>
          <h3 className="text-xl font-bold mb-2 text-center" style={{ color: "var(--primary)" }}>{currentLabels.ctList}</h3>
          {resources.filter(resource => resource.type === 'lxc').map(resource => (
            <div onClick={() => onResourceClick(resource)} key={resource.id} className="p-2 my-2 rounded-lg m-2" style={{ backgroundColor: currentResourceId === resource.id ? "var(--tertiaryContainer)" : "var(--surface)", color: currentResourceId === resource.id ? "var(--onTertiaryContainer)" : "var(--onBackground)" }}>
              <p>{resource.id} {resource.name && `(${resource.name})`}</p>
              <p>{resource.status}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full p-4" style={{ backgroundColor: "var(--background)", color: "var(--onBackground)" }}>
        {currentResource && (
          <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--surface)", color: "var(--onBackground)" }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--primary)" }}>{currentResource.id}</h3>
            <div className="mb-4">
              <p className="text-lg"><strong>{currentLabels.status}:</strong> {currentResource.status}</p>
              {currentResource.name && <p className="text-lg"><strong>{currentLabels.name}:</strong> {currentResource.name}</p>}
              {currentResource.node && <p className="text-lg"><strong>{currentLabels.node}:</strong> {currentResource.node}</p>}
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2" style={{ color: "var(--primary)" }}>{currentLabels.cpuUsage}</h4>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded" style={{ backgroundColor: "var(--primaryContainer)" }}>
                  <div style={{ width: `${(currentResource.cpu! / currentResource.maxcpu!) * 100}%`, backgroundColor: "var(--primary)" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                </div>
                <p className="text-sm">{currentResource.cpu !== undefined && currentResource.maxcpu !== undefined ? (currentResource.cpu / currentResource.maxcpu) * 100 : 0}%</p>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2" style={{ color: "var(--primary)" }}>{currentLabels.memoryUsage}</h4>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded" style={{ backgroundColor: "var(--tertiaryContainer)" }}>
                  <div style={{ width: `${(currentResource.mem! / currentResource.maxmem!) * 100}%`, backgroundColor: "var(--tertiary)" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                  </div>
                  <p className="text-sm">{currentResource.mem !== undefined && currentResource.maxmem !== undefined ? (currentResource.mem / currentResource.maxmem) * 100 : 0}%</p>
                </div>
              </div>
              <div className="mb-4">
                <div className={'line-chart'}>
                  <Line
                    data={{
                      datasets: [
                        {
                          label: currentLabels.cpuUsage,
                          data: chartDataRef.current.cpu,
                          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
                          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--onPrimary'),
                          fill: true,
                          pointRadius: 0,
                        },
                        {
                          label: currentLabels.memoryUsage,
                          data: chartDataRef.current.mem,
                          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--tertiary'),
                          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--onTertiary'),
                          fill: true,
                          pointRadius: 0,
                        }
                      ],
                    }}
                    options={{
                      interaction: {
                        intersect: false,
                      },
                      scales: {
                        x: {
                          type: 'realtime',
                          title: {
                            display: true,
                            text: 'Time',
                          },
                          adapters: {
                            date: {
                              locale: navigator.language === 'ja' ? ja : navigator.language === 'zh-TW' ? zhTW : enUS,
                            },
                          },
                          time: {
                            unit: 'second',
                          },
                          realtime: {
                            duration: 30000,
                            delay: 4000,
                            refresh: 2000,
                            frameRate: 60,
                            onRefresh: (chart) => {
                              if (!currentResource) return;

                              const now = Date.now();
                              const cpu = currentResource.cpu;
                              const mem = currentResource.mem;
                              const maxmem = currentResource.maxmem;

                              if (cpu !== undefined && mem !== undefined && maxmem !== undefined) {
                                chartDataRef.current.cpu.push({ x: now, y: cpu * 100 });
                                chartDataRef.current.mem.push({ x: now, y: maxmem !== 0 ? (mem / maxmem) * 100 : 0 });

                                chartDataRef.current.cpu = chartDataRef.current.cpu.filter(d => now - d.x < 60000);
                                chartDataRef.current.mem = chartDataRef.current.mem.filter(d => now - d.x < 60000);

                                chart.update();
                              }
                            }
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Usage',
                          },
                          min: 0,
                          max: 100,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
        )}
          </div>
    </div>
      );
}
