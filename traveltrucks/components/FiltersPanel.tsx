'use client';
import { useState } from 'react';
import { useStore } from '../store/useStore';


export default function FiltersPanel() {
const filters = useStore((s) => s.filters);
const setFilters = useStore((s) => s.setFilters);
const [location, setLocation] = useState(filters.location ?? '');
const [bodyType, setBodyType] = useState(filters.bodyType ?? '');
const [features, setFeatures] = useState<string[]>(filters.features ?? []);


const toggleFeature = (f: string) => {
setFeatures((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));
};
const apply = () => {
setFilters({ location: location || undefined, bodyType: bodyType || undefined, features });
};


const clear = () => {
setLocation('');
setBodyType('');
setFeatures([]);
setFilters({ location: undefined, bodyType: undefined, features: [] });
};


return (
<div>
<div>
<label>Location</label>
<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or ZIP" />
</div>
<div>
<label>Body type</label>
<select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
<option value="">Any</option>
<option value="van">Van</option>
<option value="camper">Camper</option>
<option value="truck">Truck</option>
</select>
</div>


<div>
<label>Features</label>
<div>
{['AC', 'kitchen', 'bathroom', 'TV', 'radio'].map((f) => (
<label key={f} style={{ marginRight: 8 }}>
<input type="checkbox" checked={features.includes(f)} onChange={() => toggleFeature(f)} /> {f}
</label>
))}
</div>
</div>


<div style={{ marginTop: 10 }}>
<button onClick={apply}>Apply</button>
<button onClick={clear} style={{ marginLeft: 8 }}>Clear</button>
</div>
</div>
);
}