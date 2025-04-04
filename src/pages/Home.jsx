export const Home = () => {
	return (
	  <div className="d-flex flex-column min-vh-100">
		<main className="container flex-grow-1 text-center mt-5">
		  <div className="py-5">
			<h1 className="display-1 text-primary mb-4">Contact Manager</h1>
			
			<img 
			  src="/src/assets/img/rigo-baby.jpg" 
			  className="img-fluid rounded-circle mb-4 shadow"
			  style={{ 
				width: "250px", 
				height: "250px", 
				objectFit: "cover" 
			  }}
			/>
			<p className="fs-3 text-muted mb-5">
			  Manage your contacts easily and efficiently
			</p>
			</div>
      </main>
    </div>
  );
};