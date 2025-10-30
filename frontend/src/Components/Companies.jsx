import React from "react";

const companies = [
  { id: 1, name: "Company 1", imgSrc: "https://imgs.search.brave.com/PRUCd7Lx5YICpEMu4oHQacjvQkaxee-c8jg0DG65vwg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmpkbWFnaWNi/b3guY29tL2NvbXAv/a29sa2F0YS81NS8w/MzNwZjAwNTM1NS9j/YXRhbG9ndWUvaWNp/Y2ktbG9tYmFyZC1n/ZW5lcmFsLWluc3Vy/YW5jZS1jb21wYW55/LWx0ZC1wYXJrLXN0/cmVldC1rb2xrYXRh/LXRyYXZlbC1pbnN1/cmFuY2UtYWdlbnRz/LW1kYmR0MTIzYm0u/anBnP3c9Mzg0MCZx/PTc1" },
  { id: 2, name: "Company 2", imgSrc: "https://imgs.search.brave.com/pPiTI-V9wJTgOJOVI4uuYpoufDkOqsJnoRY05nCjKhQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvMTAwMHYv/MDUvNzgvbGljLWxv/Z28tbGlmZS1pbnN1/cmFuY2UtY29ycG9y/YXRpb24tb2YtaW5k/aWEtdmVjdG9yLTUw/MTUwNTc4LmpwZw" },
  { id: 3, name: "Company 3", imgSrc: "https://imgs.search.brave.com/_gSasHUJV1t-8k6J47KWwF-bb3JJzORaCr8YsEOcLJ0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cmVuZXdidXkuY29t/L3NpdGVzL2RlZmF1/bHQvZmlsZXMvMjAy/My0wNi9oaS1sb2dv/LU5pdmEucG5n" },
  { id: 4, name: "Company 4", imgSrc: "https://imgs.search.brave.com/TFBQtGSWLeZ4o_jTNzj65Xi5Z8bmib6pmSB0m13mgis/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMucGJjZG4uaW4v/Y2RuL2ltYWdlcy9p/bnN1cmVyLWxvZ28v/YmFqYWotYWxsaWFu/ei1saWZlLWluc3Vy/YW5jZS5qcGc" },
  { id: 5, name: "Company 5", imgSrc: "https://imgs.search.brave.com/Re6OWFFUe9UO1Owle3LOMOPbJEnf1TWJTaUZqfhirzg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvODI1/Nzg2OS5qcGc" },
  { id: 6, name: "Company 6", imgSrc: "https://imgs.search.brave.com/R6vakzwEi_i0QMQsGcx1B-sW4XXmZqXNrpriwiPc_2c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oZWFs/dGhzdGF0aWMuaW5z/dXJhbmNlZGVraG8u/Y29tL3Byb2Qvb2Vt/LzIwMjQxMjE4MTM1/MzAwLnBuZw" },
  { id: 7, name: "Company 7", imgSrc: "https://imgs.search.brave.com/CBZvR3XHG3S1XOYZXs6_kQ7UnLF0r53_29lfJShbPzI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9qb2lu/ZGl0dG8uaW4vc3Rh/dGljLzBkN2ZhZjQ1/YWNkZDU0YjI4OTY2/ZDk3NTVmMmIwNjdl/L2Q5NWZiL3RhdGFh/aWcucG5n" },
  { id: 8, name: "Company 8", imgSrc: "https://imgs.search.brave.com/yOXVdErh-USLHpq2I_zfrW8e73DFKcbgEmCNs_OSvyM/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZXRpbWcuY29tL3Ro/dW1iL21zaWQtMTIz/NTAxNzcyLHdpZHRo/LTE2MCxoZWlnaHQt/MTIwL3N0b2NrLXJh/ZGFyLXRoZS1uZXct/aW5kaWEtYXNzdXJh/bmNlLWNvbXBhbnkt/c3RvY2stdGFrZXMt/c3VwcG9ydC1hYm92/ZS01MC1kbWEtZm9y/bWluZy1pbnZlcnNl/LWhlYWQtc2hvdWxk/ZXJzLXBhdHRlcm4u/anBn" },
  { id: 9, name: "Company 8", imgSrc: "https://imgs.search.brave.com/27phMAUg4oRPFBx-qSrL2X-BQFUxmXNAz8AI-jvN9rQ/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4u/cG9saWN5eC5jb20v/Y21zLW1lZGlhL2lj/aWNpLXRlcm0taW5z/dXJhbmNlLWxvZ28t/d2ViJTIwKDEpMzky/NC0xNzI3NjgwMDkz/MTI5MC0xNzMyNzkz/MTQ4LndlYnA" },
  { id: 10, name: "Company 8", imgSrc: "https://imgs.search.brave.com/z9s91DOm-GFdaQfrLT86dXvwG1vwICyeASoMnjH7y0I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtbmV0c3RvcmFn/ZS5ncm93dy5pbi9z/dG9jay1hc3NldHMv/bG9nb3MyL0dPRElH/SVQud2VicA" },
  { id: 11, name: "Company 8", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUG4PTcDzgTYdus3aaneG1fqBNBbeJ7x1U8yTrHkg0e3kNHAaD8xvfFKkYnVmbtEbPkQ&usqp=CAU" },
  // { id: 12, name: "Company 8", imgSrc: "https://imgs.search.brave.com/LzHNK8cH8H6i00vCppHqxj21hSrbwusjPRHLHKtAlng/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RzLzQwNC9m/NzFkOGExOTgzMjcz/OTMuWTNKdmNDdzBN/alU1TERNek16RXNN/VEUzTUN3eE56ay5q/cGc" },
  // { id: 13, name: "Company 8", imgSrc: "https://imgs.search.brave.com/YRz5L45L6OuLsAbRpqQjCpsYvsU8Zf85ekG1qCxI2HQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmpkbWFnaWNi/b3guY29tL3YyL2Nv/bXAvbXVtYmFpL24x/LzAyMnB4eDIyLnh4/MjIuMTMwMTA5MTUw/NTM3LmE0bjEvY2F0/YWxvZ3VlL2Nob2xh/bWFuZGFsYW0taW52/ZXN0bWVudC1hbmQt/ZmluYW5jZS1jb21w/YW55LWx0ZC1iYW5k/cmEta3VybGEtY29t/cGxleC1iYW5kcmEt/ZWFzdC1tdW1iYWkt/ZmluYW5jZS1hZ2Fp/bnN0LXZlaGljbGVz/LWJkdWVyamE3ejIu/anBnP3c9Mzg0MCZx/PTc1" },
 
];

const TestimonialCompanies = () => {
  return (
    <section className="py-5 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
          OUR PARTNERS
        </h2>

        {/* Companies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6 items-center justify-items-center">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:scale-105 transition-transform duration-300"
            >
              <img
                src={company.imgSrc}
                alt={company.name}
                className="h-12 md:h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCompanies;
