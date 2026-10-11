use std::net::SocketAddr;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let _guard = listing::logging::init_tracing();

    let db_url = std::env::var("DATABASE_URL").unwrap_or_else(|_| "sqlite:dev.db".to_string());
    let pool = sqlx::SqlitePool::connect(&db_url).await?;

    let app = listing::app(pool);
    let port: u16 = std::env::var("PORT")
        .ok()
        .and_then(|value| value.parse().ok())
        .unwrap_or(3000);
    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    let listener = TcpListener::bind(addr).await?;
    tracing::info!("Server running on http://{}", addr);

    axum::serve(listener, app).await?;

    Ok(())
}
