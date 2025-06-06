# Kubernetes Deployment Guide

This directory contains Kubernetes manifests to deploy the skill-wanderer blog-v2 application on any Kubernetes cluster.

## Prerequisites

- A running Kubernetes cluster
- `kubectl` configured to access your cluster
- Optional: `kustomize` for customized deployments

## Quick Deployment

Deploy all resources using kubectl:

```bash
kubectl apply -f k8s/
```

Or using kustomize:

```bash
kubectl apply -k k8s/
```

## Customization

### Domain Configuration

Edit `k8s/ingress.yaml` and replace `blog.example.com` with your actual domain:

```yaml
rules:
- host: your-domain.com  # Replace with your domain
```

### TLS/SSL Support

Uncomment the TLS section in `k8s/ingress.yaml` and configure your certificate:

```yaml
tls:
- hosts:
  - your-domain.com
  secretName: blog-v2-tls
```

### Image Version

To deploy a specific version, edit the image tag in `k8s/deployment.yaml` or use kustomize:

```yaml
# In kustomization.yaml
images:
- name: ghcr.io/skill-wanderer/blog-v2
  newTag: v1.0.0
```

### Scaling

Adjust the number of replicas in `k8s/deployment.yaml`:

```yaml
spec:
  replicas: 3  # Increase for higher availability
```

## Resource Requirements

The deployment is configured with minimal resource requirements:

- **Requests**: 64Mi memory, 50m CPU
- **Limits**: 128Mi memory, 100m CPU

Adjust these values in `deployment.yaml` based on your cluster capacity and traffic expectations.

## Accessing the Application

1. **Via Ingress**: Configure your DNS to point to your ingress controller's IP
2. **Via Port Forward**: `kubectl port-forward service/blog-v2-service 8080:80`
3. **Via NodePort**: Change service type to `NodePort` in `service.yaml`
4. **Via LoadBalancer**: Change service type to `LoadBalancer` in `service.yaml`

## Health Checks

The deployment includes:

- **Liveness Probe**: Checks if the container is running (restarts if failing)
- **Readiness Probe**: Checks if the container is ready to serve traffic

## Cleanup

To remove all resources:

```bash
kubectl delete -f k8s/
```

Or with kustomize:

```bash
kubectl delete -k k8s/
```