# Narrative Frontend Take-Home Exercise Prompt (1) -- Juliette Lamarche

## Setup

Then enviroment variable `VITE_NARRATIVE_API_KEY` must be set to the UUID part of the link for the application to work properly. 

## Remarks

- Some boilerplate code could be removed by integration of datafetching to routing (as granted by many frameworks).
- The state management solution I retained would need to use a library like [optics-ts](https://github.com/akheron/optics-ts) to scale properly; I chose to keep that dependancy away for this exercise.
- I have not written tests that ensures conformity of API calls to data schemes as these are always validated at runtime.
- Documents state buy-orders' ids are numbers, however provided API types them as strings. I have typed them as strings.
