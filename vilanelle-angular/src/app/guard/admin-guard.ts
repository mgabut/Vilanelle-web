import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../service/jwt-service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const jwt = inject(JwtService);
  const router = inject(Router);

  // Pas connecté → login
  if (!jwt.hasToken) {
    return router.createUrlTree(['/login']);
  }

  // Si joueur → accès refusé
  if (jwt.isJoueur) {
    return router.createUrlTree(['/game']); // ou une page 403
  }

  // OK si admin
  if (jwt.isAdmin) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
